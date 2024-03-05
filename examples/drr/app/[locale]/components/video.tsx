export const Video = () => {
  return (
    <div className=" flex h-[656px] w-full items-center justify-center py-16 ">
      <iframe
        width="960"
        height="415"
        src="https://www.youtube.com/embed/gTqcyUQ7esg?si=HbDm6T6I1EiuRggA"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};
