import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";
import { useNavigate } from 'react-router';

const UserQuizCard = ({
  title,
  description,
  createDate,
  updateDate,
  published,
  id
}) => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    try {
      const response = await axiosPrivate.delete(`/quiz/${id}`);
      if (response.status >= 400) {
        throw new Error('Server Error');
      }
      navigate(0);
    } catch (err) {
      setMessage('No Server Response');
    }
  }

  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{createDate}</p>
      <p>{updateDate}</p>
      <p>Published: {published.toString()}</p>
      <button onClick={handleDelete} >Delete Quiz</button>
      <div>{message}</div>
    </div>
  );
};

export default UserQuizCard;
