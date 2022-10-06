import { ChromeMessage, Sender } from "../types";

type MessageResponse = (response?: any) => void;

const validateSender = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender
) => {
  return sender.id === chrome.runtime.id && message.from === Sender.React;
};

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse
) => {
  const isValidated = validateSender(message, sender);

  if (isValidated && message.message === "getAvgPrice") {
    var price = document.getElementsByClassName("a-offscreen");
    var productName = document.getElementsByClassName(
      "a-color-state a-text-bold"
    );

    let totalValidPrice = 0;
    let subOfAllPrice = 0;

    for (let i = 0; i < price.length; i++) {
      let ProductPrice = price[i]?.innerHTML;
      let finalPrice = Math.ceil(
        parseInt(ProductPrice?.substring(1).replace(/,/g, ""))
      );
      if (finalPrice) {
        totalValidPrice = totalValidPrice + 1;
        subOfAllPrice = subOfAllPrice + finalPrice;
      }
    }
    let productCurrency =
      document.getElementsByClassName("a-price-symbol")[0].innerHTML;

    let nameOfProduct = productName[0].innerHTML;

    let res =
      "Average price for " +
      nameOfProduct.replace(/["]+/g, "") +
      " is " +
      productCurrency +
      Math.round(subOfAllPrice / totalValidPrice);

    response(res);
  }
};

const main = () => {
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
};

main();
