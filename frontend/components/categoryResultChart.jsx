import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'
import { ResponsiveContainer } from 'recharts'

const CategoryResultChart = ({ userResult, maxResult }) => (
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
