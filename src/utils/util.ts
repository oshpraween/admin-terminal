export class Utility {
  public static isDefined(val: unknown): boolean {
    if (val === null || val === undefined || val === '') {
      return false;
    }

    return true;
  }

  public static convertUnicodeToString(input: string): string | undefined {
    if (this.isDefined(input)) {
      return input.replace(/\\u(\w\w\w\w)/g, (_a: string, b: string) => {
        const charcode = parseInt(b, 16);
        return String.fromCharCode(charcode);
      });
    }
    return undefined;
  }
}
