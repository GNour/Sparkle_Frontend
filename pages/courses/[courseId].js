import ScrollableContainer from "../../components/Common/ScrollableContainer";
import ContentCard from "../../components/CoursesPage/ContentCard";
import CourseLayout from "../../components/Layouts/TasksLayout/CourseLayout";
import { RiVideoFill, RiArticleFill, RiCheckDoubleFill } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import { useState } from "react";
import TitleDescription from "../../components/Common/TitleDescription";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
const CoursePage = () => {
  const [previewedContent, setPreviewedContent] = useState(
    <div className="text-muted text-center my-5">
      Choose from content to get started
    </div>
  );

  const [previewedContentDetails, setPreviewedContentDetails] = useState({
    title: "N/A",
    description: "N/A",
  });

  const handleContentCardOnClick = (content, details) => {
    setPreviewedContentDetails(details);
    setPreviewedContent(
      <div>
        <div className="mb-2">{content}</div>
        <div>
          <ActionButtonWithIcon
            externalStyles="w-100 disabled"
            icon={<RiCheckDoubleFill style={{ marginRight: "2px" }} />}
            text={`Complete ${details.type}`}
          />
        </div>
      </div>
    );
  };

  const video = {
    id: 1,
    video: "https://youtu.be/yrJ7CVeiFvo",
    title: "Corrine Williamson",
    description:
      "Voluptatem officiis est aut eius. Voluptatem rerum eum ipsam. Dolorum voluptatem ea natus alias.",
    course_id: 1,
  };

  const article = {
    id: 1,
    title: "Lelia Conn",
    body: "lsmkaddlmasmlkdmasl mkamlksmlkda smlkd amkdsa mkllmkda smklads mlk dasmlkd askmldm kalsmkld asmkld asmlkad smklasd mklads mkladmslk mka dlsmklda smlkads mlkads kmlad smklads mlk\n\nHello World with breaks\n\nTesting  lsmkaddlmasmlkdmasl mkamlksmlkda smlkd amkdsa mkllmkda smklads mlk dasmlkd askmldm kalsmkld asmkld asmlkad smklasd mklads mkladmslk mka dlsmklda smlkads mlkads kmlad smklads mlk\n\nHello World with breaks\n\nTesting  lsmkaddlmasmlkdmasl mkamlksmlkda smlkd amkdsa mkllmkda smklads mlk dasmlkd askmldm kalsmkld asmkld asmlkad smklasd mklads mkladmslk mka dlsmklda smlkads mlkads kmlad smklads mlk\n\nHello World with breaks\n\nTesting  lsmkaddlmasmlkdmasl mkamlksmlkda smlkd amkdsa mkllmkda smklads mlk dasmlkd askmldm kalsmkld asmkld asmlkad smklasd mklads mkladmslk mka dlsmklda smlkads mlkads kmlad smklads mlk\n\nHello World with breaks\n\nTesting  lsmkaddlmasmlkdmasl mkamlksmlkda smlkd amkdsa mkllmkda smklads mlk dasmlkd askmldm kalsmkld asmkld asmlkad smklasd mklads mkladmslk mka dlsmklda smlkads mlkads kmlad smklads mlk\n\nHello World with breaks\n\nTesting lsmkaddlmasmlkdmasl mkamlksmlkda smlkd amkdsa mkllmkda smklads mlk dasmlkd askmldm kalsmkld asmkld asmlkad smklasd mklads mkladmslk mka dlsmklda smlkads mlkads kmlad smklads mlk\n\nHello World with breaks\n\nTesting ",
    description:
      "Sit ut aut doloribus iure velit. Omnis voluptas cumque eos beatae sunt. Adipisci esse saepe ipsa labore fugit est. Magnam ad est nisi sit veniam.",
    course_id: 1,
    created_at: "2021-10-15T21:58:59.000000Z",
    updated_at: "2021-10-15T21:58:59.000000Z",
    deleted_at: null,
  };

  const quiz = {
    id: 1,
    limit: "08:20:20",
    description:
      "Itaque sint eveniet quae consequatur iure. Dolore eligendi in nesciunt ipsam eveniet repudiandae.",
    title:
      "Saepe odio voluptate eius molestiae ducimus. Non aut asperiores ut impedit est nihil.",
    weight: 0,
    course_id: 1,
    created_at: "2021-10-15T21:58:59.000000Z",
    updated_at: "2021-10-15T21:58:59.000000Z",
    deleted_at: null,
  };
  return (
    <CourseLayout>
      <div className="col-xl-7 col-lg-7 order-2 order-md-1">
        <div className="custom-container rounded p-2">
          <TitleDescription
            title={previewedContentDetails.title}
            description={previewedContentDetails.description}
          />
          {previewedContent}
        </div>
      </div>
      <ScrollableContainer
        externalStyles="col-xl-5 mh-350 overflow-y-scroll order-1 order-md-2 col-lg-5 rounded custom-container"
        header="Content"
      >
        <ContentCard
          icon={<RiVideoFill fontSize="24" />}
          title={video.title}
          type="Video"
          content={video}
          action={handleContentCardOnClick}
        />
        <ContentCard
          icon={<RiArticleFill fontSize="24" />}
          title={article.title}
          isCompleted
          type="Article"
          content={article}
          action={handleContentCardOnClick}
        />
        <ContentCard
          icon={<MdQuiz fontSize="24" />}
          title={quiz.title}
          type="Quiz"
          content={quiz}
          action={handleContentCardOnClick}
        />
      </ScrollableContainer>
    </CourseLayout>
  );
};

export default CoursePage;
