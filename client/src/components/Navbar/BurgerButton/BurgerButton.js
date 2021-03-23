import { BurgerWrapper, ButtonStyle } from '../../../styles/HeaderStyle';

const BurgerButton = ({ toggleDropdown, open }) => {
    const onClick = () => {
        toggleDropdown();
    };

    return (
        <BurgerWrapper onClick={onClick}>
            <ButtonStyle className={open ? 'open' : ''}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </ButtonStyle>
        </BurgerWrapper>
    );
};

export default BurgerButton;
