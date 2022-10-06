import React, { useEffect, useState } from "react";
import { ChromeMessage, Sender } from "./types";
import { getCurrentTabUId, getCurrentTabUrl } from "./chrome/utils";

export const Home = () => {
  const [responseFromContent, setResponseFromContent] = useState<string>("");
  const [isAmazonSite, setIsAmazonsite] = useState<boolean>(false);
  const getPrice = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "getAvgPrice",
    };

    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, message, (response) => {
          setResponseFromContent(response);
        });
    });
  };
  const checkAmazonSite = async () => {
    getCurrentTabUrl((url) => {
      if (url && url.includes("amazon.com/s?")) {
        setIsAmazonsite(true);
      }
    });
  };

  useEffect(() => {
    checkAmazonSite();
    getPrice();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isAmazonSite ? (
          <>
            {/* <button onClick={getPrice}>Get average price</button> */}
            <p>{responseFromContent}</p>
          </>
        ) : (
          <>
            <p>This is not amazon product search page</p>
          </>
        )}
      </header>
    </div>
  );
};
