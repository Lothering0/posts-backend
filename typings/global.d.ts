export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;

      POSTGRES_HOST: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_PORT: string;

      PRIVATE_KEY: string;
    }
  }
}
