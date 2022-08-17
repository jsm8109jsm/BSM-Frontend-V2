import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useModal } from '../../hooks/useModal';
import { userState } from '../../store/account.store';
import styles from '../../styles/header.module.css';

export const Header = () => {
    const { openModal } = useModal();
    const [user] = useRecoilState(userState);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const userMenuView = () => (
        mounted && (
            user.isLogin
            ?<div className={`dropdown-menu ${styles.dropdown}`}>
                <span className={styles.item}>{user.nickname}</span>
                <ul className='dropdown-content'>
                    <li><a href='https://auth.bssm.kro.kr/user' className='option' >유저 정보 수정</a></li>
                </ul>
            </div>
            :(<span className={styles.item} onClick={() => openModal('login')}>로그인</span>)
        )
    )

    return (
        <header className={styles.header}>
            <div className={styles.top}>
                <nav className={styles.top_menu_bar}>
                    <ul className={styles.left}>
                        <li className={`${styles.item} ${styles.home}`}><Link href='/'><img src='/logo/logo.png' alt='logo' className='logo' /></Link></li>
                        <li className={`dropdown-menu ${styles.dropdown}`}>
                            <span className={styles.item}>학교</span>
                            <ul className='dropdown-content'>
                                <li><Link href='/meal'><a className='option'>급식</a></Link></li>
                                <li><Link href='/timetable'><a className='option'>시간표</a></Link></li>
                                <li><Link href='/meister'><a className='option'>인증제 / 상벌점</a></Link></li>
                                <li><a href='https://school.busanedu.net/bssm-h/main.do' className='option'>학교 홈페이지</a></li>
                            </ul>
                        </li>
                        <li className={`dropdown-menu ${styles.dropdown}`}>
                            <span className={styles.item}>커뮤니티</span>
                            <ul className='dropdown-content'>
                                <li><Link href='/board/board'><a className='option'>자유게시판</a></Link></li>
                                <li><Link href='/board/software'><a className='option'>소프트웨어</a></Link></li>
                                <li><Link href='/board/embedded'><a className='option'>임베디드</a></Link></li>
                                <li><Link href='/board/notice'><a className='option'>공지사항</a></Link></li>
                            </ul>
                        </li>
                        <li className={`dropdown-menu ${styles.dropdown}`}>
                            <span className={styles.item}>다른 서비스</span>
                            <ul className='dropdown-content'>
                                <li><a href='https://auth.bssm.kro.kr/' className='option' >BSM Auth</a></li>
                                <li><a href='https://drive.bssm.kro.kr/' className='option' >BSM Cloud</a></li>
                                <li><a href='https://tetris.bssm.kro.kr/' className='option' >BSM Tetris</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className={styles.right}>
                        <li>{userMenuView()}</li>
                    </ul>
                </nav>
            </div>
            <div className={styles.side}></div>
        </header>
    )
}