const QuizImage = ({ img }) => {
  return (
    <img
      src={`https://ucarecdn.com/${img}/-/scale_crop/520x390/center/-/quality/smart/`}
      width="260px"
      height="195px"
    />
  );
};

export default QuizImage;