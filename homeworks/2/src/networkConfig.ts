import { getFullnodeUrl } from "@mysten/sui.js/client";
import {
  LOCALNET_COUNTER_PACKAGE_ID,
  DEVNET_COUNTER_PACKAGE_ID,
  MAINNET_COUNTER_PACKAGE_ID,
  LOCALNET_DEVHUB_PACKAGE_ID,
  LOCALNET_DEVHUB_OBJECT_ID,
  DEVNET_DEVHUB_PACKAGE_ID,
  DEVNET_DEVHUB_OBJECT_ID,
  MAINNET_DEVHUB_PACKAGE_ID,
  MAINNET_DEVHUB_OBJECT_ID,
} from "./constants.ts";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    localnet: {
      url: getFullnodeUrl("localnet"),
      variables: {
        counterPackageId: LOCALNET_COUNTER_PACKAGE_ID,
        devhubPackageId: LOCALNET_DEVHUB_PACKAGE_ID,
        devhub: LOCALNET_DEVHUB_OBJECT_ID,
      },
    },
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        counterPackageId: DEVNET_COUNTER_PACKAGE_ID,
        devhubPackageId: DEVNET_DEVHUB_PACKAGE_ID,
        devhub: DEVNET_DEVHUB_OBJECT_ID,
      },
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        counterPackageId: MAINNET_COUNTER_PACKAGE_ID,
        devhubPackageId: MAINNET_DEVHUB_PACKAGE_ID,
        devhub: MAINNET_DEVHUB_OBJECT_ID,
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
