import { Button } from "@/components/ui/Button";
import { Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { EmojiTextarea } from "@/components/form/EmojiTextarea";
import { formatDate } from "@/utils/formatDate";

interface IActions {
  onCloseForm: () => void;
}

interface IUser {
  uuid: string;
  username: string;
  image: string;
}

const mockCurrentUser: IUser = {
  uuid: "1234",
  username: "zealy",
  image: "/logo.png",
};

interface IComment {
  uuid: string;
  text: string;
  commentUser: IUser;
  createdAt: string;
}

interface ICommentListProps {
  comments: IComment[];
}
interface ICommentProps {
  comment: IComment;
}

const mockCommentList: IComment[] = [
  {
    uuid: "1",
    text: "Hi that is just a task",
    createdAt: new Date().toISOString(),
    commentUser: mockCurrentUser,
  },
  {
    uuid: "2",
    text: "Hi that is just a mock",
    createdAt: new Date().toISOString(),
    commentUser: mockCurrentUser,
  },
];

interface IFormBodyProps {
  currentUser: IUser;
  onAddNewComment: (comment: IComment) => void;
}

/**
 * FormAction is a component to render the Form action which can user make
 */
const FormAction = ({ onCloseForm }: IActions) => {
  return (
    <div className=" justify-end flex border-b-gray-700 border-b-2">
      <Button variant="link" onClick={onCloseForm}>
        <X className="h-4 w-4" color="white" />
      </Button>
    </div>
  );
};

/**
 * Comment is a component to render user comment
 */
const Comment = ({ comment }: ICommentProps) => {
  return (
    <div className="flex mb-4 gap-4 text-white">
      {/* Icon */}
      <div className="w-10 h-10 rounded-full">
        <img className="rounded-full" src={comment.commentUser.image} />
      </div>
      <div>
        {/* Header */}
        <div className="flex gap-2 items-center  w-full">
          <div className="font-bold">{comment.commentUser.username}</div>
          <div className=" text-sm text-gray-500">
            {formatDate(comment.createdAt)}
          </div>
        </div>
        {/* Body */}
        <div>{comment.text}</div>
      </div>
    </div>
  );
};

/**
 * CommentList is a component to render the list of user comments
 */
const CommentList = ({ comments }: ICommentListProps) => {
  return (
    <div className="p-2">
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </div>
  );
};

/**
 * FormBody is a component to render the form to add a new component for the current user
 */
const FormBody = ({ currentUser, onAddNewComment }: IFormBodyProps) => {
  const handleAddNewComment = (text: string) => {
    onAddNewComment({
      text,
      createdAt: new Date().toISOString(),
      uuid: new Date().toISOString() + text,
      commentUser: currentUser,
    });
  };
  return (
    <div className="p-2 flex mb-4 gap-4 text-white">
      {/* Icon */}
      <div className="w-10 h-10 rounded-full">
        <img className="rounded-full" src={currentUser.image} />
      </div>
      <EmojiTextarea onSubmit={handleAddNewComment} />
    </div>
  );
};

/**
 * FormLayout is a component to render the Form of the application
 */
export const FormLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const handleChangeFormMode = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleAddNewComment = (comment: IComment) => {
    setCommentList([...commentList, comment]);
  };

  useEffect(() => {
    setCurrentUser(mockCurrentUser);
    setCommentList(mockCommentList);
  }, []);

  return (
    <div className="flex gap-2 w-1/2 m-10">
      <div>
        <Button onClick={handleChangeFormMode}>
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      {isOpen && (
        <div className=" flex-1 bg-gray-800 p-2 text-white rounded-md">
          <FormAction onCloseForm={handleCloseForm} />
          <CommentList comments={commentList} />
          {currentUser && (
            <FormBody
              currentUser={currentUser}
              onAddNewComment={handleAddNewComment}
            />
          )}
        </div>
      )}
    </div>
  );
};
