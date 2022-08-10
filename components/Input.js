/** @format */

import React, { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { db, storage } from "../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  const addEmoji = (e) => {
    console.log("I'm working");
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    console.log(emoji);
    setInput(input + emoji);
  };
  const sendPost = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });
    const imageRef = ref(storage, `posts/${docRef.id}/images`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };
  };
  return (
    <div
      className={` border-gray-700 border-b p-3 space-x-3 overscroll-y-scroll flex ${
        loading && "opacity-60"
      }`}
    >
      <img
        src={session?.user.image}
        alt=""
        className="w-11 h-11 rounded-full object-cover cursor-pointer"
      />
      <div className="divide divide-y w-full divide-gray-700">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            placeholder="What's happening?"
            name=""
            id=""
            rows="2"
            className="bg-transparent outline-none t-primary text-lg placeholder-gray-500 tracking-wide  w-full min-h-[50px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => {
                  filePickerRef.current.click();
                }}
              >
                <PhotographIcon className="h-[22px] c-color" />
                <input
                  // className="hidden"
                  hidden
                  ref={filePickerRef}
                  type="file"
                  onChange={addImageToPost}
                />
              </div>
              <div className="icon rotate-90">
                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon " onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>
            </div>
            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
        {showEmojis && (
          <Picker
            data={data}
            onEmojiSelect={(e) => addEmoji(e)}
            style={{
              position: "absolute",
              marginTop: "465px",
              marginLeft: -40,
              maxWidth: "320px",
              borderRadius: "20px",
            }}
            theme="dark"
          />
        )}
      </div>
    </div>
  );
}

export default Input;
