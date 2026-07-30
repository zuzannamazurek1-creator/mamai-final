/**
 * Kompresja zdjęcia profilowego po stronie przeglądarki:
 * 1. Przycina obraz do kwadratu (środek).
 * 2. Skaluje do max 400×400 px.
 * 3. Kompresuje do WebP (fallback: JPEG), aż plik waży poniżej 100 KB.
 */

const MAX_SIZE_BYTES = 100 * 1024; // 100 KB
const TARGET_DIMENSION = 400;

export type CompressedAvatar = {
  blob: Blob;
  extension: "webp" | "jpg";
  contentType: "image/webp" | "image/jpeg";
};

async function loadImage(
  file: File,
): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file);
    } catch {
      // Niektóre przeglądarki/formaty nie wspierają createImageBitmap — użyj <img>.
    }
  }
  return await new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(
        new Error(
          "Nie udało się wczytać obrazu. Użyj pliku JPG, PNG lub WebP.",
        ),
      );
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function compressAvatar(file: File): Promise<CompressedAvatar> {
  const image = await loadImage(file);

  const sourceWidth =
    image instanceof HTMLImageElement ? image.naturalWidth : image.width;
  const sourceHeight =
    image instanceof HTMLImageElement ? image.naturalHeight : image.height;

  if (!sourceWidth || !sourceHeight) {
    throw new Error("Nie udało się odczytać wymiarów obrazu.");
  }

  // Kwadratowy kadr ze środka obrazu
  const side = Math.min(sourceWidth, sourceHeight);
  const sx = (sourceWidth - side) / 2;
  const sy = (sourceHeight - side) / 2;
  const size = Math.min(TARGET_DIMENSION, side);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Twoja przeglądarka nie wspiera przetwarzania obrazów.");
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, sx, sy, side, side, 0, 0, size, size);

  // Najpierw WebP w malejącej jakości…
  for (const quality of [0.8, 0.7, 0.6, 0.5, 0.4]) {
    const blob = await canvasToBlob(canvas, "image/webp", quality);
    if (blob && blob.type === "image/webp" && blob.size <= MAX_SIZE_BYTES) {
      return { blob, extension: "webp", contentType: "image/webp" };
    }
  }

  // …fallback: JPEG (np. starsze Safari bez zapisu WebP)
  for (const quality of [0.75, 0.6, 0.45, 0.3]) {
    const blob = await canvasToBlob(canvas, "image/jpeg", quality);
    if (blob && blob.size <= MAX_SIZE_BYTES) {
      return { blob, extension: "jpg", contentType: "image/jpeg" };
    }
  }

  throw new Error("Nie udało się skompresować zdjęcia poniżej 100 KB.");
}
