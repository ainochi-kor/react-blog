import AuthContext from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

enum PostFormInput {
  TITLE = "title",
  SUMMARY = "summary",
  CONTENT = "content",
}

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        summary,
        content,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });
      toast.success("게시글을 생성했습니다.");
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === PostFormInput.TITLE) {
      setTitle(value);
    }
    if (name === PostFormInput.SUMMARY) {
      setSummary(value);
    }
    if (name === PostFormInput.CONTENT) {
      setContent(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__block">
        <label htmlFor={PostFormInput.TITLE}>제목</label>
        <input
          type="text"
          name={PostFormInput.TITLE}
          id={PostFormInput.TITLE}
          onChange={handleChange}
          value={title}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor={PostFormInput.SUMMARY}>요약</label>
        <input
          type="text"
          name={PostFormInput.SUMMARY}
          id={PostFormInput.SUMMARY}
          onChange={handleChange}
          value={summary}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor={PostFormInput.CONTENT}>내용</label>
        <textarea
          name={PostFormInput.CONTENT}
          id={PostFormInput.CONTENT}
          onChange={handleChange}
          value={content}
          required
        />
      </div>
      <div className="form__block">
        <input type="submit" value="제출" className="form__button--submit" />
      </div>
    </form>
  );
};

export default PostForm;
