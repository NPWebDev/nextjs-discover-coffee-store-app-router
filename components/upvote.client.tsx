"use client";

import { upvoteAction } from "@/actions";
import Image from "next/image";
import { useFormState } from "react-dom";

export default function Upvote({ voting, id }: { voting: number; id: string }) {
  const initialState = {
    id,
    voting,
  };
  const [state, dispatch] = useFormState(upvoteAction, initialState);
  const handleOnClick = () => {
    console.log("upvote on click");
  };
  return (
    <form action={dispatch}>
      <div className="flex mb-6">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{state ? state.voting : 0}</p>
      </div>
      <button onClick={handleOnClick}>Up vote!</button>
    </form>
  );
}
