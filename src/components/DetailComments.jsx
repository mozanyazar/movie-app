import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../store/AuthContext";
import { db } from "../firebase";
const DetailComments = ({ movieId }) => {
  const { setMessage, user } = UserAuth();
  const [allComments, setAllComments] = useState([{}]);
  const [anyComment, setAnyComment] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const creatingCollectionForMovie = async () => {
    let name = user.displayName;
    let userId = user.uid;
    try {
      const movieComments = doc(db, "comments", movieId);
      await updateDoc(movieComments, {
        comments: arrayUnion({
          name,
          userId,
          comment,
        }),
      }).then(() => {
        if (anyComment == false) {
          setAllComments([
            {
              name: name,
              userId: userId,
              comment: comment,
            },
          ]);
          setAnyComment(true);
        } else if (anyComment == true) {
          setAllComments((prev) => [
            ...prev,
            {
              name: name,
              userId: userId,
              comment: comment,
            },
          ]);
        }
        setAnyComment(true);
        setMessage({
          message: "succesfull!",
          isSucces: true,
        });
      });
    } catch (e) {
      setMessage({
        message: "Error, try again!",
        isSucces: false,
      });
    }
  };

  const CommentsSnapShot = async () => {
    const docRef = doc(db, "comments", movieId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAllComments(docSnap.data().comments);
      setLoading(true);
      setAnyComment(true);
      console.log("commentsSnapShot true !");
    } else {
      setDoc(doc(db, "comments", movieId), {});
      setLoading(true);
      setAnyComment(false);
    }
  };

  const newCommentHandler = (e) => {
    e.preventDefault();
    if (comment.trim() != "" && user != null) {
      creatingCollectionForMovie();
    } else if (comment.trim() == "") {
      setMessage({
        isSucces: false,
        message: "comments can not be emty",
      });
    }
  };
  useEffect(() => {
    CommentsSnapShot();
  }, []);

  return (
    <div className="bg-slate-200 p-5 box-border mb-10 shadow-2xl">
      {user && (
        <div className="flex gap-5 items-center px-4 py-2 bg-slate-800 w-max mb-6 rounded-xl shadow-2xl">
          <div className="h-[60px] w-[60px] bg-gray-50 rounded-full relative overflow-hidden">
            <div className="w-[30px] h-[30px] bg-slate-500 rounded-full absolute left-1/2 translate-x-[-50%] translate-y-[-50%] top-1/2 z-40"></div>
            <div className="w-[40px] h-[32px] bg-slate-300 rounded-full absolute left-1/2 translate-x-[-50%] translate-y-[-50%] top-[53px]"></div>
          </div>
          <h3 className=" font-primaryFont text-slate-300 text-lg">
            Welcome {user.displayName}
          </h3>
        </div>
      )}

      <form onSubmit={newCommentHandler}>
        <textarea
          disabled={!user}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          className={`pl-4 pt-2 max-h-[350px] min-h-[80px] w-full ${
            !user && "bg-slate-300"
          } `}
          placeholder={!user ? "you have to login" : "enter your comment !"}
        ></textarea>
        <button
          disabled={!user}
          type="submit"
          className="py-2 min-w-[230px] flex justify-center px-5 rounded-2xl bg-slate-300 mb-4 shadow-xl self-end w-max max-[576px]:self-start max-[576px]:w-full"
        >
          {user ? "Submit" : "Login"}
        </button>
      </form>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg text-slate-600 font-secondaryFont">
          All Comments{" "}
        </h3>
        {loading == false ? (
          <div>Loading ...</div>
        ) : (
          <div>
            {anyComment == true && allComments != undefined ? (
              allComments.map((message, index) => {
                return <p key={index}>{message.comment}</p>;
              })
            ) : (
              <p className=" text-base text-slate-900 font-secondaryFont">
                there is no comment yet !
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailComments;
