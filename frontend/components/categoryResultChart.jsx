import React from 'react'
import styled from 'styled-components'

/* const CategoryResultChart = ({ userResult, maxResult }) => (
  <>
    <ReactSpeedometer
      value={userResult}
      maxValue={maxResult}
      needleColor="steelblue"
      needleTransition="easeLinear"
      needleTransitionDuration={6000}
      needleHeightRatio={0.6}
      segments={7}
      segmentColors={[
        '#ff5900',
        '#ffa200',
        '#FFC200',
        '#FFD700',
        '#c1db6b',
        '#9edb6b',
        '#5cd175',
      ]}
      maxSegmentLabels={0}
      valueTextFontSize={0}
      fluidWidth
      height={150}
    />
  </>
) */

const Speedometer = styled.svg`
  width:211px;
  height:200px;
`

const CategoryResultChart = ({ userResult, maxResult }) => (
  <>
    <Speedometer>
      <g class="arc" transform="translate(105.5, 105.5)">
        <path class="speedo-segment" fill="#ff5900" d="M-85.5,-1.047073013270987e-14A85.5,85.5,0,0,1,-77.03283820565683,-37.09705969455123L-22.974706131511685,-11.064035347497734A25.5,25.5,0,0,0,-25.5,-3.1228493378257506e-15Z" />
        <path class="speedo-segment" fill="#ffa200" d="M-77.03283820565683,-37.09705969455123A85.5,85.5,0,0,1,-53.30837805892171,-66.84659175101656L-15.898989947397704,-19.936702802934764A25.5,25.5,0,0,0,-22.974706131511685,-11.064035347497734Z" />
        <path class="speedo-segment" fill="#FFC200" d="M-53.30837805892171,-66.84659175101656A85.5,85.5,0,0,1,-19.025539853264874,-83.35633649154592L-5.674283815886016,-24.860661760636503A25.5,25.5,0,0,0,-15.898989947397704,-19.936702802934764Z" />
        <path class="speedo-segment" fill="#FFD700" d="M-19.025539853264874,-83.35633649154592A85.5,85.5,0,0,1,19.025539853264867,-83.35633649154592L5.674283815886013,-24.860661760636503A25.5,25.5,0,0,0,-5.674283815886016,-24.860661760636503Z" />
        <path class="speedo-segment" fill="#c1db6b" d="M19.025539853264867,-83.35633649154592A85.5,85.5,0,0,1,53.308378058921704,-66.84659175101656L15.898989947397702,-19.936702802934764A25.5,25.5,0,0,0,5.674283815886013,-24.860661760636503Z" />
        <path class="speedo-segment" fill="#9edb6b" d="M53.308378058921704,-66.84659175101656A85.5,85.5,0,0,1,77.0328382056568,-37.09705969455127L22.97470613151168,-11.064035347497748A25.5,25.5,0,0,0,15.898989947397702,-19.936702802934764Z" />
        <path class="speedo-segment" fill="#5cd175" d="M77.0328382056568,-37.09705969455127A85.5,85.5,0,0,1,85.5,-5.695444116327053e-14L25.5,-1.6986412276764895e-14A25.5,25.5,0,0,0,22.97470613151168,-11.064035347497748Z" />
      </g>
      <g class="pointer" transform="translate(105.5, 105.5)">
        <path d="M5,0C3.333333333333333,-31.5,1.6666666666666667,-63,0,-63C-1.6666666666666667,-63,-3.333333333333333,0,-5,0C-3.333333333333333,0,-1.6666666666666667,5,0,5C1.6666666666666667,5,3.333333333333333,2.5,5,0" transform={`rotate(${userResult / maxResult * 180 - 90})`} />
      </g>
    </Speedometer>
  </>
)

/*
const CategoryResultChart = ({ userResult, maxResult }) => (
  <>
    <ReactSpeedometer
      value={userResult}
      maxValue={maxResult}
      needleColor="000000"
      needleTransition="easeLinear"
      needleTransitionDuration={4500}
      needleHeightRatio={0.7}
      customSegmentStops={[0, userResult, maxResult]}
      segmentColors={['#82ca9d', '#FFD700']}
      maxSegmentLabels={0}
      valueTextFontSize={0}
      width={300}
      height={250}
    />
  </>
)
*/
export default CategoryResultChart
