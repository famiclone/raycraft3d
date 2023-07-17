export type Assets = {
  [key: string]: any;
}

export function loadAssets(src: string[]): Assets {
  const assets: Assets = {}

  src.forEach((path) => {
    const img = new Image();
    img.src = path;
    assets[path] = img;
  });

  return assets;
}
