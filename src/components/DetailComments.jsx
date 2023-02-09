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
      const date = new Date();
      // const currentDate = ;
      await updateDoc(movieComments, {
        comments: arrayUnion({
          name,
          userId,
          comment,
          date: `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`,
        }),
      }).then(() => {
        if (anyComment == false) {
          setAllComments([
            {
              name: name,
              userId: userId,
              comment: comment,
              date: `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`,
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

              date: `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`,
            },
          ]);
        }
        setComment("");
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
          value={comment}
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
              allComments.map((el, index) => {
                return (
                  <div
                    className="flex gap-4 px-2 mb-2 py-3 border-1 border-slate-400 border rounded-2xl shadow-md"
                    key={index}
                  >
                    <div>
                      <div class="h-[60px] w-[60px] bg-gray-50 rounded-full relative overflow-hidden">
                        <div class="w-[30px] h-[30px] bg-slate-500 rounded-full absolute left-1/2 translate-x-[-50%] translate-y-[-50%] top-1/2 z-40"></div>
                        <div class="w-[40px] h-[32px] bg-slate-300 rounded-full absolute left-1/2 translate-x-[-50%] translate-y-[-50%] top-[53px]"></div>
                      </div>
                      <p className="text-center mt-1 capitalize">{el.name}</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="mt-2 text-md italic text-slate-600 font-secondaryFont">
                        {el.comment}
                      </p>
                      <span className="text-md text-indigo-900 font-secondaryFont px-2 py-1 bg-slate-400 h-max rounded-2xl">
                        {el.date}
                      </span>
                    </div>
                  </div>
                );
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
