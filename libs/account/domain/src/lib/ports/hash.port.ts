export interface HashPort {
  signAsync(
    payload: object,
    options: {
      secret: string;
      expiresIn: number;
    }
  ): Promise<string>;
}
