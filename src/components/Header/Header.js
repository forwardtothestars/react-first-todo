import React from "react";
import styles from './Header.module.css'
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import {setMenuState} from "../../Redux/main-reducer";

const Header = ({setMenuState, isRightMenuOpen}) => {
    const changeRightMenuStatus = () => {
        setMenuState(!isRightMenuOpen)
    }

    return (
        <header className={styles.header}>
            <div className={styles.fixed_block}>

                <div className={styles.header_blocks}>
                    <div className={styles.menuButton} onClick={changeRightMenuStatus}>
                        <MenuIcon color={'#fff'} fontSize="large"/>
                    </div>
                    <span>TODO</span>
                </div>
            </div>
        </header>
    )
}
let mapStateToProps = (state) => {
    return {
        isRightMenuOpen: state.main.isRightMenuOpen
    }
}
export default connect(mapStateToProps, {setMenuState})(Header);