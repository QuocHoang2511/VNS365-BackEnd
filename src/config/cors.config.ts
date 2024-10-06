import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

// const WHITELIST = process.env.ZEN_WHITELISTED_DOMAINS?.split(',');

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    callback(null, true);

    // if (!!(origin || (WHITELIST && WHITELIST.includes(origin)))) {
    //   callback(null, true);
    // } else {
    //   callback(new Error('Not allowed by CORS'));
    // }
  },
  methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH",
  credentials: true,
};
