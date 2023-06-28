import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';

// Kiet imported
import JobUserMoreMenu from './JobUserMoreMenu';
import { intlFormat } from 'date-fns';
import JobMoreMenu from './JobMoreMenu';
// import cover
// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
  const { id, name, categoryId, description, salary, experience, isRemote, category } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 0 || index === 0;

  const POST_INFO = [
    { number: salary, icon: 'eva:credit-card-fill' },
    { number: experience, icon: 'eva:award-fill' },
    { number: isRemote == 1 ? 'Remote' : 'Office', icon: 'eva:wifi-fill' },
  ];

  // const POST_INFO = [
  //   { number: comment, icon: 'eva:message-circle-fill' },
  //   { number: view, icon: 'eva:eye-fill' },
  //   { number: share, icon: 'eva:share-fill' },
  // ];
  return (
    // Adding a list of Campaigns
    <Card sx={{ position: 'relative', marginTop: '10px' }}>
      {/* // <CoverImgStyle alt={title} src={cover} /> */}
      {/* <UserMoreMenu /> */}
      <CardContent
        sx={{
          pt: 4,
          bottom: 0,
          width: '100%',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography gutterBottom variant="h4" sx={{ color: 'text.primary', display: 'block' }}>
            {name}
          </Typography>
          <JobMoreMenu sx={{ justifyContent: 'flex-end' }} post={post} />
        </Stack>

        <Typography
          // to="#"
          color="inherit"
          variant="caption"
        // underline="hover"
        // component={RouterLink}
        // sx={{
        //   ...(latestPostLarge && { typography: 'h5', height: 60 }),
        //   ...((latestPostLarge || latestPost) && {
        //     color: 'common.white',
        //   }),
        // }}
        >
          {description}
        </Typography>

        <InfoStyle>
          {POST_INFO.map((info, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: index === 0 ? 0 : 1.5,
                ...((latestPostLarge || latestPost) && {
                  color: 'grey.500',
                }),
              }}
            >
              <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />


              <Typography variant="caption">{info.number}</Typography>
            </Box>
          ))}
        </InfoStyle>
      </CardContent>
    </Card>

  );
}
