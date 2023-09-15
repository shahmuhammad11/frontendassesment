import React, { useState } from 'react';
import Image1 from './Assets/user1.png';
import Image2 from './Assets/user2.png';
import Image3 from './Assets/user3.png';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartbeat, faReply } from '@fortawesome/free-solid-svg-icons';

function CommentSection() {
  const [containerData, setContainerData] = useState([
    {
      name: 'Maria',
      icon: Image1,
      comments: [],
      liked: false,
    },
    {
      name: 'Alex Binjamin',
      icon: Image2,
      comments: [],
      liked: false,
    },
    {
      name: 'Tania',
      icon: Image3,
      comments: [],
      liked: false,
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyInput, setReplyInput] = useState('');

  const addComment = (index) => {
    if (newComment.trim() !== '') {
      const updatedContainerData = [...containerData];
      updatedContainerData[index].comments.push({
        text: newComment,
        liked: false,
        replies: [],
        isReplying: false,
      });
      setContainerData(updatedContainerData);
      setNewComment('');
    }
  };

  const toggleLike = (containerIndex, commentIndex) => {
    const updatedContainerData = [...containerData];
    updatedContainerData[containerIndex].comments[commentIndex].liked = !updatedContainerData[containerIndex].comments[commentIndex].liked;
    setContainerData(updatedContainerData);
  };

  const toggleReply = (containerIndex, commentIndex) => {
    const updatedContainerData = [...containerData];
    updatedContainerData[containerIndex].comments[commentIndex].isReplying = !updatedContainerData[containerIndex].comments[commentIndex].isReplying;
    setContainerData(updatedContainerData);
  };

  const replyToComment = (containerIndex, commentIndex, replyText) => {
    if (replyText.trim() !== '') {
      const updatedContainerData = [...containerData];
      updatedContainerData[containerIndex].comments[commentIndex].replies.push({
        text: replyText,
        liked: false,
      });
      setContainerData(updatedContainerData);
      toggleReply(containerIndex, commentIndex); 
    }
  };

  return (
    <div className="bg-blue-50 relative">
      <div className="absolute top-36 left-80 font-comment font-bold">Comment</div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col w-3/5 h-400">
          {containerData.map((container, containerIndex) => (
            <div
              key={containerIndex}
              className={`flex-grow border-b bg-white mb-3 shadow-xl relative`}
            >
              <div className="ml-16 mt-3 h-24">
                <div className="text-black font-bold text-lg">{container.name}</div>
                <div className="text-gray-600">
                  I was very glad to have you after such a long time. Can you plan a meetup? Maybe this weekend?
                </div>
              </div>
              <div className="absolute top-2 left-2 text-white w-12 h-12 flex items-center justify-center rounded-full">
                <img src={container.icon} alt={container.name} />
              </div>
              <div className="ml-16">
                {container.comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className="mb-2">
                    <div className="text-black">{comment.text}</div>
                    <div className="mt-1">
                      <button
                        className={`text-sm ${comment.liked ? 'text-red-500' : 'text-gray-500'}`}
                        onClick={() => toggleLike(containerIndex, commentIndex)}
                      >
                        {comment.liked ? <FontAwesomeIcon icon={faHeartbeat} /> : <FontAwesomeIcon icon={faHeart} />}
                      </button>
                      <button
                        className="text-sm text-gray-500 ml-2"
                        onClick={() => toggleReply(containerIndex, commentIndex)}
                      >
                        <FontAwesomeIcon icon={faReply} /> Reply
                      </button>
                      {comment.isReplying && (
                        <div className="mt-2">
                          <input
                            type="text"
                            className="h-8 flex-grow pl-2"
                            placeholder="Your Reply"
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                          />
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                            onClick={() => replyToComment(containerIndex, commentIndex, replyInput)}
                          >
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center">
            <input
              type="text"
              className="h-10 flex-grow pl-2"
              name="fullname"
              placeholder="Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="ml-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => addComment(0)}
              >
                <FontAwesomeIcon icon={faPaperPlane} /> Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CommentSection;
