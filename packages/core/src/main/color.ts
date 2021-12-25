

export function color(): PaintBucket {
  return new PaintBucket();
}


export interface PaintBucket {
  asd(foo: number): this;
}

PaintBucket.prototype.asd = function (this: PaintBucket, foo) {
  const lab = this.takeForUpdate(Lab);
  return this;
};


color().asd(123);

