import sharp from "sharp";

const SRC = "C:/Users/roita/פורטל רשי/logo_white_background_tight.png";
const OUT = "C:/Users/roita/פורטל רשי/gavish-portal/public/logos/chinuch-lachaim.png";

const img = sharp(SRC).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const idx = (x, y) => (y * W + x) * C;

// near-white test
const isLight = (i) => data[i] > 222 && data[i + 1] > 222 && data[i + 2] > 222;

// flood fill from every border pixel through the connected light region -> alpha 0.
// Interior whites (text fill, enclosed by the navy ring) are never reached, so kept.
const stack = [];
const seen = new Uint8Array(W * H);
for (let x = 0; x < W; x++) { stack.push([x, 0]); stack.push([x, H - 1]); }
for (let y = 0; y < H; y++) { stack.push([0, y]); stack.push([W - 1, y]); }

let cut = 0;
while (stack.length) {
  const [x, y] = stack.pop();
  if (x < 0 || y < 0 || x >= W || y >= H) continue;
  const p = y * W + x;
  if (seen[p]) continue;
  seen[p] = 1;
  const i = idx(x, y);
  if (!isLight(i)) continue;       // boundary -> stop (keeps navy ring + interior)
  data[i + 3] = 0;                  // transparent
  cut++;
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

// soften the 1px halo: opaque-but-light pixels touching a transparent one -> fade
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = idx(x, y);
  if (data[i + 3] === 0) continue;
  if (data[i] > 210 && data[i + 1] > 210 && data[i + 2] > 210) {
    const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dx, dy] of nb) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      if (data[idx(nx, ny) + 3] === 0) { data[i + 3] = 90; break; }
    }
  }
}

await sharp(data, { raw: { width: W, height: H, channels: C } }).png().toFile(OUT);
console.log(`done: cut ${cut} px transparent, ${W}x${H} -> ${OUT}`);
