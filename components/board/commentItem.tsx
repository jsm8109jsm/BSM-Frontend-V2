import { useRecoilState } from 'recoil';
import { HttpMethod, useAjax } from '../../hooks/useAjax';
import { boardAndPostIdState, parentCommentState } from '../../store/board.store';
import styles from '../../styles/board/comment.module.css';
import { Comment, DeletedComment } from "../../types/boardType"

export const CommentList = ({
    commentList,
    loadComments
}: {
    commentList: (Comment | DeletedComment)[],
    loadComments: Function
}) => {
    const {ajax} = useAjax();
    const [, setParentComment] = useRecoilState(parentCommentState);
    const [boardAndPostId] = useRecoilState(boardAndPostIdState);
    const { boardId, postId } = boardAndPostId;

    const deleteComment = (id: number) => {
        ajax({
            url: `comment/${boardId}/${postId}/${id}`,
            method: HttpMethod.DELETE,
            callback() {
                loadComments();
            }
        })
    }
    
    return (
        <ul className='left'>{
            commentList.map(comment => (
                <li key={comment.id}>
                    <div className={styles.item_wrap}>
                        <div className={styles.item} onClick={() => !comment.delete && setParentComment(comment)}>
                            {
                                comment.delete
                                ? <span className={styles.deleted}>삭제된 댓글 입니다</span>
                                : <>
                                    <div className='rows gap-1'>
                                        <div className='cols center'>
                                            <img className={`user-profile ${styles.user_profile}`} src={`https://auth.bssm.kro.kr/resource/user/profile/profile_${comment.user.code}.png`} onError={e => e.currentTarget.src = '/icons/profile_default.png'} alt='user profile' />
                                        </div>
                                        <div className='cols flex-main'>
                                            <div className='rows space-between bold'>
                                                <span>{comment.user.nickname}</span>
                                            </div>
                                            <div>{new Date(comment.createdAt).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: comment.content}}></div>
                                </>
                            }
                        </div>
                        {
                            !comment.delete && 
                            comment.permission && 
                            <div className='left-slide-menu'>
                                <span className='menu-button'>
                                    <span className='line'></span>
                                    <span className='line'></span>
                                    <span className='line'></span>
                                </span>
                                <ul className='menu-list'>
                                    <li>
                                        <button
                                            className='button delete'
                                            onClick={() => {
                                                if (confirm('정말 삭제하시겠습니까?')) {
                                                    deleteComment(comment.id);
                                                }
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                    <div className={styles.child}>
                        {comment.child && <CommentList commentList={comment.child} loadComments={loadComments} />}
                    </div>
                </li>
            ))
        }</ul>
    )
}