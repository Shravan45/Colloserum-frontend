import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./Connectors";

export const Dapp = ({ className }) => {
  
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (exception) {
      console.log(exception);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    
  );
};