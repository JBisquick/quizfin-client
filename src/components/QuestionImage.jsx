const QuestionImage = ({ img }) => {
    return (
      <img
        src={`https://ucarecdn.com/${img}/-/preview/640x640/-/quality/smart/`}
        width="320px"
        height="auto"
      />
    );
  };
  
  export default QuestionImage;