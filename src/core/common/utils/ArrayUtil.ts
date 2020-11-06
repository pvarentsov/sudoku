export class ArrayUtil {

  public static generateSequence(startValue: number = 0, length: number, options?: {shuffle: boolean}): number[] {
    const sequence: number[] = Array(length)
      .fill(0)
      .map((element, index) => index + startValue);

    if (options?.shuffle) {
      sequence.sort(() => Math.random() - 0.5);
    }

    return sequence;
  }

}