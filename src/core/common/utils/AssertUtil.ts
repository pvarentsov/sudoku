import { Nullable, Optional } from '@sudoku/core/common';

export class AssertUtil {

  public static isTrue(expression: boolean, error: Error): void {
    if (!expression) {
      throw error;
    }
  }

  public static isFalse(expression: boolean, error: Error): void {
    if (expression) {
      throw error;
    }
  }

  public static notEmpty<T>(value: Optional<Nullable<T>>, error: Error): T {
    if (value === null || value === undefined) {
      throw error;
    }
    return value;
  }

  public static isEmpty<T>(value: Optional<Nullable<T>>, error: Error): void {
    if (value) {
      throw error;
    }
  }

}