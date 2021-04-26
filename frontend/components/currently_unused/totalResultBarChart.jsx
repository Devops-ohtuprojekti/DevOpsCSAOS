import React from 'react'
import styled from 'styled-components'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import Heading from '../heading'

const segmentColors = [
  '#ff5900',
  '#ffa200',
  '#FFC200',
  '#FFD700',
  '#c1db6b',
  '#9edb6b',
  '#5cd175',
]

const percentageTopLimitsOfColors = [
  0.142,
  0.284,
  0.426,
  0.568,
  0.691,
  0.833,
  1,
]

// findIndex returns index of first item in array to satisfy criterion given
const getColor = (userResult, maxResult) => segmentColors[
  percentageTopLimitsOfColors.findIndex(
    (limit) => userResult / maxResult <= limit,
  )
]

// responsiveness TODO: make chart responsive (<800 px in mobile layout)
const TotalResultChart = ({ data, renderMobileLayout }) => {
  if (renderMobileLayout) {
    return (
      <>
        <Heading component="h4" variant="h5">
          Compare your results
        </Heading>
        <ResponsiveContainer id="BarChartContainer" height={450} width="85%">
          <BarChart
            layout="vertical"
            width={500}
            height={850}
            data={data}
            margin={{
              top: 5,
              right: 15,
              left: 15,
              bottom: 5,
            }}
            barGap={6}
            barCategoryGap="10%"
          >
            <YAxis dataKey="name" type="category" />
            <XAxis type="number" hide />

            <Tooltip cursor={{ fill: 'transparent' }} />

            <Bar dataKey="userPoints" name="Your result">
              {data.map((entry, index) => (
                <Cell
                  fill={getColor(entry.userPoints, entry.maxPoints)}
                  key={index}
                />
              ))}
            </Bar>

            <Bar
              dataKey="maxPoints"
              fill="#148AB3"
              name="Peer average placeholder"
            />
            <Bar dataKey="maxPoints" fill="#5cd175" name="Max" />
          </BarChart>
        </ResponsiveContainer>
      </>
    )
  }
  return (
    <>
      <Heading component="h4" variant="h5">
        Compare your results
      </Heading>
      <ResponsiveContainer id="BarChartContainer" height={450} width="70%">
        <BarChart
          width={850}
          height={500}
          data={data}
          margin={{
            top: 40,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          barGap={8}
        >
          <XAxis dataKey="name" />
          <Tooltip cursor={{ fill: 'transparent' }} />

          <Bar dataKey="userPoints" barSize={30} name="Your result">
            {data.map((entry, index) => (
              <Cell
                fill={getColor(entry.userPoints, entry.maxPoints)}
                key={index}
              />
            ))}
          </Bar>

          <Bar
            dataKey="maxPoints"
            fill="#148AB3"
            barSize={30}
            name="Peer average placeholder"
          />
          <Bar dataKey="maxPoints" barSize={30} fill="#5cd175" name="Max" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
export default TotalResultChart
