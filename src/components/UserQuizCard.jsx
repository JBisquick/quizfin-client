const UserQuizCard = ({
  title,
  description,
  createDate,
  updateDate,
  published
}) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{createDate}</p>
      <p>{updateDate}</p>
      <p>Published: {published.toString()}</p>
    </div>
  );
};

export default UserQuizCard;
