export interface PaypalModuleInterface {
  clientId: string;
  clientSecret: string;
  environment: 'sandbox' | 'live';
}

export interface EnvironmentVariables {
  port: number;
  paypalModuleInterface: PaypalModuleInterface;
}

export default (): EnvironmentVariables => ({
  port: 9981,
  paypalModuleInterface: {
    clientId: process.env.PAYPAL_CLIENT_ID as string,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET as string,
    environment: process.env.PAYPAL_ENVIRONMENT as 'sandbox' | 'live',
  },
});
