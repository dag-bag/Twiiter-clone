/** @format */

import React, { useEffect, useState } from "react";
import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import { signOut } from "next-auth/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

import PostP from "./Post";
function Feed() {
  const [Posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div
        className="t-primary flex items-center sm:justify-between py-2 px-3
       sticky border-b border-gray-700 top-0 z-50 bg-black opacity-70"
      >
        <h2 className="font-bold text-lg sm:text-xl">Home</h2>

        <div className="hoverAnimation flex items-center justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      <div className="pb-72">
        {Posts.map((post) => {
          return <PostP key={post.id} id={post.id} post={post.data()} />;
        })}
      </div>
    </div>
  );
}

export default Feed;
