import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const initialState = [...new Array(4)].map((_, idx) => ({
    uuid: idx,
    value: "",
  }));

  const currentRef = useRef(0);

  const [twoFA, setTwoFA] = useState(initialState);

  const nos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleKeyDown = (e) => {
    const tempArr = [...twoFA];

    //metakey for mac , ctrl key for windows
    // if (e.metaKey && e.code === "KeyV") {
    //   console.log("first");
    //   console.log(e.clipboardData);
    //   console.log(window.clipboardData);
    //   const text = e.clipboardData.getData("text").split("");
    //   console.log(text);
    //   const areAllTextNos = text.every((text) => nos.includes(Number(text)));

    //   if (areAllTextNos) {
    //     const tempArr2 = [...twoFA];
    //     const a = tempArr2.map((val, idx) => ({ ...val, value: text[idx] }));
    //     currentRef.current = Number(text.length);
    //     setTwoFA(a);
    //   }
    // }

    if (e.key === "Backspace" && currentRef.current > 0) {
      tempArr[currentRef.current - 1].value = "";
      currentRef.current = currentRef.current - 1;
    }

    if (nos.includes(Number(e.key))) {
      tempArr[currentRef.current].value = e.key;
      currentRef.current = currentRef.current + 1;
    }

    setTwoFA(tempArr);
  };

  const code = "1234";

  const handleCodeValidity = () => {
    const codefromaRRAY = twoFA.map((arr) => arr.value).join("");

    if (code === codefromaRRAY) {
      return true;
    } else {
      return false;
    }
  };

  console.log(handleCodeValidity());

  // const handlePaste = (e) => {
  //   const text = e.clipboardData.getData("text").split("");
  //   const areAllTextNos = text.every((text) => nos.includes(Number(text)));

  //   if (areAllTextNos) {
  //     const tempArr2 = [...twoFA];
  //     const a = tempArr2.map((val, idx) => ({ ...val, value: text[idx] }));
  //     currentRef.current = Number(text.length);
  //     setTwoFA(a);
  //   }
  // };

  console.log(twoFA);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div className="flex min-h-screen gap-5 justify-center items-center flex-col">
      <div className="flex gap-4">
        {twoFA.map((fa, idx) => (
          <span className="border border-black h-20 w-20 p-10">{fa.value}</span>
        ))}
      </div>

      <button
        onClick={handleCodeValidity}
        className="border border-black px-4 py-2"
      >
        Check is valid
      </button>
    </div>
  );
}

export default App;
