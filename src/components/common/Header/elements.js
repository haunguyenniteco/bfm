/**
 * styled elements for Header
 */
import { css } from '@emotion/css'
import { styled } from '@mui/material/styles'
import is from 'styled-is'
import {
  Menu,
  Basket,
  Search,
  Profile,
  User,
  BackArrow,
  Logo,
  BrowseMenu,
  Favourite,
  Offer,
  Place,
  ForwardArrow,
} from '@components/Icons'
import { media } from '@theming/media'
import Box from '@mui/material/Box'
import Typography from '@components/ui/Typography/index'

const defaultIconsStyles = ({ theme }) => css`
  width: 20px;
  height: 20px;
  color: ${theme.palette.brand};
  margin-left: 20px;
  cursor: pointer;
`

export const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grayLight};
`

export const BrandLogo = styled(Logo)`
  cursor: pointer;
  margin-left: 15px;
  polygon {
    fill: ${({ theme }) => theme.palette.brand};
  }
`

export const MenuIcon = styled(({ ...props }) => <Menu {...props} />)`
  ${defaultIconsStyles};
  margin-left: 0;
`
export const BrowseMenuIcon = styled(({ ...props }) => <BrowseMenu {...props} />)`
  ${defaultIconsStyles};
  margin-left: 0;
`

export const BasketIcon = styled(({ ...props }) => <Basket {...props} />)`
  ${defaultIconsStyles};
`

export const SearchIcon = styled(({ ...props }) => <Search {...props} />)`
  ${defaultIconsStyles};
  margin-left: 0;

  ${media.desktop`
    margin-left: 20px;
  `};
`

export const ProfileIcon = styled(({ ...props }) => <Profile {...props} />)`
  ${defaultIconsStyles};
`

export const MobileProfileIcon = styled(User)`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.palette.text};
  margin-left: 0;
  margin-right: 10px;
`

export const PlaceIcon = styled(Place)`
  margin-right: 1rem;
  height: 20px;
  width: 20px;
  color: ${({ theme }) => theme.palette.text};
`

export const ArrowBackIcon = styled(BackArrow)`
  height: 12px;
  width: 12px;
  margin-right: 1rem;
  color: ${({ theme }) => theme.palette.text};
`

export const ArrowForwardIcon = styled(ForwardArrow)`
  margin-left: 1rem;
  height: 20px;
  width: 20px;
  color: ${({ theme }) => theme.palette.text};
`

export const Brand = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  max-width: 120px;

  ${media.tablet`
    max-width: 100%;
  `};
`

export const BasketBubbleWrapper = styled('div')`
  position: relative;

  ${is('hasCount')`
    top: 2px;
    margin-right: 14px;
    ${media.tablet`
      margin-right: 0;
    `};
  `};
`

export const Navbar = styled('div')`
  overflow: hidden;
`

export const PageLink = styled('a')`
  float: left;
  font-size: 18px;
  text-align: center;
  padding: 15px 16px;
  text-decoration: none;

  &:hover {
    background-color: white;
  }
`

export const DropdownLink = styled('a')`
  margin-top: 1px;
  display: flex;
  font-size: 14px;
  text-align: center;
  padding: 15px 16px;
  text-decoration: none;
  margin: 0;
  color: ${({ theme }) => theme.palette.primary};

  ${is('clicked')`
    color: ${({ theme }) => theme.palette.brand};
    background-color: white;
  `};
`

export const Dropdown = styled('div')`
  float: left;
  overflow: hidden;
`

export const DropdownContent = styled('div')`
  width: 100%;
  position: absolute;
  top: auto;
  font-size: 1.1em;
  border: 0;
  left: 50% !important;
  border-left: 1px solid ${({ theme }) => theme.palette.grayLight};
  border-right: 1px solid ${({ theme }) => theme.palette.grayLight};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grayLight};
  background-color: ${({ theme }) => theme.palette.white};
  max-width: 1270px;
  transform: translateX(-50%);
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
  padding: 0;
  visibility: hidden;
  opacity: 0;

  ${is('clicked')`
    visibility: visible;
    opacity: 1;
    overflow: hidden;
  `};
`

export const CategoryTitle = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  text-transform: capitalize;
`

export const RebassLink = styled('a')`
  text-decoration: none;
  ${is('basket')`
    ${media.tablet`
      margin-right: 15px;
    `};
  `};
`

export const AccountDropdownMenu = styled('div')`
  width: 260px;
  background: #fff;
  right: 0;
  z-index: 1400;
  margin-top: 0px;
  border: 1px solid ${props => props.theme.palette.G3};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  position: absolute;
  will-change: transform;
  top: 0px;
  right: calc(-100% - 8px);
  transform: translate3d(0px, 40px, 0px);

  ${media.desktop`
    transform: translate3d(0px, 40px, 0px);
    right: -100%;
  `};

  &:after,
  &:before {
    bottom: 100%;
    left: 76%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;

    ${media.desktop`
      left: 63.5%;
    `};
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
    border-width: 9px;
    margin-left: -9px;
  }

  &:before {
    border-color: rgba(213, 216, 218, 0);
    border-bottom-color: #d5d8da;
    border-width: 10px;
    margin-left: -10px;
  }
`

export const AccountMenuContainer = styled('div')`
  color: ${props => props.theme.palette.text};
  background-color: ${props => props.theme.palette.white};
  padding-top: 5px;
`

export const AccountMenuListItem = styled('div')`
  height: 42px;
  padding: 10px 16px 10px 16px;
  cursor: pointer;

  &.menu-header .title,
  &.menu-footer .title {
    margin-left: 0;
  }

  &.menu-header {
    color: ${props => props.theme.palette.G0};
    &:hover {
      color: ${props => props.theme.palette.G0};
    }
  }

  &.menu-footer .title {
    font-weight: normal;
  }

  &.menu-item {
    padding-left: 18px;
    background-color: ${props => props.theme.palette.G4};
  }

  &:hover {
    color: ${props => props.theme.palette.primaryDark};
  }
`

export const AccountMenuListItemTitle = styled(Typography)`
  line-height: 1.4;
`

export const IconLink = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  width: 70px;
  outline: none;

  p {
    font-size: ${props => props.theme.fontSizes[1]};
    margin: 5px 0;
  }
`

export const FavoriteIcon = styled(({ ...props }) => <Favourite {...props} />)`
  ${defaultIconsStyles};
  margin-left: 0;
`

export const OffersIcon = styled(({ ...props }) => <Offer {...props} />)`
  ${defaultIconsStyles};
  margin-left: 0;
`

export const MenuBackdrop = styled('div')`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: #000;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  visibility: hidden;
  display: none;
  opacity: 0;

  ${is('isVisible')`
    display: block;
    opacity: .4;
    visibility: visible;
  `};
`

export const FeaturedListContainer = styled('div')`
  display: flex;
  flex-direction: column;
`
export const FeaturedListItem = styled('a')`
  height: 48px;
  align-items: center;
  margin: auto 10px;
  display: flex;
`

export const FeaturedListText = styled(Typography)`
  padding-left: 11px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.32px;
`
