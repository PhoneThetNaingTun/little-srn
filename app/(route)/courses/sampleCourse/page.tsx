const SampleCoursePage = () => {
  const sampleCourseDetails = [
    {
      id: 1,
      iframe: (
        <iframe
          src="https://www.youtube.com/embed/LTIN1Ll3WjU?si=UnjRqb0JIMBxx7jx"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-[250px]"
        ></iframe>
      ),
    },
    {
      id: 2,
      iframe: (
        <iframe
          src="https://www.youtube.com/embed/04hSCQxE1Sc?si=W3l6JTOq_GsZ_nlQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-[250px]"
        ></iframe>
      ),
    },
    {
      id: 3,
      iframe: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/NRioJ1vNE6o?si=5S8FSu7w4ld1A6qR"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-[250px]"
        ></iframe>
      ),
    },
    {
      id: 4,
      iframe: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/nxD6foHV9Ts?si=6JM5OM2eeLCxyYNJ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-[250px]"
        ></iframe>
      ),
    },
    {
      id: 5,
      iframe: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/gU33eUUpO_E?si=dlRThl8lzv5zM79r"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-[250px]"
        ></iframe>
      ),
    },
    {
      id: 6,
      iframe: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/6FzyLNsNyZY?si=EZTo5C9QWRalwsen"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-[250px]"
        ></iframe>
      ),
    },
    {
      id: 7,
      iframe: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/lQQCGGJpk-Y?si=U4-g-Joj_UKlOome"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-[250px]"
        ></iframe>
      ),
    },
    {
      id: 8,
      iframe: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/wJBfwjoyHCg?si=m8gTxG4rVP2XszLc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-[250px]"
        ></iframe>
      ),
    },
  ];
  return (
    <div className="my-10 ">
      <p className="text-center font-semibold text-2xl bg-gradient-to-r bg-clip-text text-transparent from-blue-500  via-violet-600 to-yellow-500">
        Coding For Kids (Scratch)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  p-5">
        {sampleCourseDetails.map((item) => {
          return <div key={item.id}>{item.iframe}</div>;
        })}
      </div>
    </div>
  );
};

export default SampleCoursePage;
