import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box sx={{ width: 100, height: 100, ...sx }}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}

      {/* F-Code */}
     
      <svg width="100" height="100" viewBox="0 0 3500 3500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2311.53 1215.66L1089.07 1659L1208.21 1238.4L2410.64 798L2311.53 1215.66Z" fill="url(#paint0_linear_218_12)" />
        <path d="M1047.99 2214.86L1507.94 2040.4L2026.04 2384.04L1544.95 2543.6L1047.99 2214.86Z" fill="#D9D9D9" />
        <path d="M1169.55 1807.77L2026.01 2384.03L1544.92 2542.63L1047.96 2214.85L1169.55 1807.77Z" fill="url(#paint1_linear_218_12)" />
        <path d="M1666.51 2140.83L1047.96 2214.85L1169.55 1807.77L1666.51 2140.83Z" fill="#D6A91E" />
        <path d="M2105.31 1834.2L2232.2 1405.97L1169.55 1807.77L1047.96 2214.85L2105.31 1834.2Z" fill="url(#paint2_linear_218_12)" />
        <path d="M2163.47 1633.31L2232.2 1405.97L1169.55 1807.77L1143.12 1897.65L2163.47 1633.31Z" fill="url(#paint3_linear_218_12)" />
        <defs>
          <linearGradient id="paint0_linear_218_12" x1="1095.57" y1="1543.44" x2="2422.56" y2="914.309" gradientUnits="userSpaceOnUse">
            <stop stop-color="#2DB656" />
            <stop offset="1" stop-color="#74DC65" />
          </linearGradient>
          <linearGradient id="paint1_linear_218_12" x1="1248.85" y1="2040.39" x2="1692.95" y2="2431.61" gradientUnits="userSpaceOnUse">
            <stop offset="0.0652429" stop-color="#E3B525" />
            <stop offset="0.789675" stop-color="#FFC81B" />
          </linearGradient>
          <linearGradient id="paint2_linear_218_12" x1="1640.08" y1="1564.58" x2="1835.69" y2="2035.1" gradientUnits="userSpaceOnUse">
            <stop offset="0.167047" stop-color="#1D8D2B" />
            <stop offset="0.43085" stop-color="#2DA150" />
            <stop offset="0.807736" stop-color="#2BB857" />
          </linearGradient>
          <linearGradient id="paint3_linear_218_12" x1="1640.08" y1="1564.58" x2="1835.69" y2="2035.1" gradientUnits="userSpaceOnUse">
            <stop offset="0.0581062" stop-color="#218F2F" />
          </linearGradient>
        </defs>
      </svg>
     
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
