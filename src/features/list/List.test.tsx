import React from 'react' 

import { createChildren } from './List'
import Gif from './Gif'

describe('createChildren', () => {
  test('returns a list of GIFs', () => {
    const gifs = [
      {
        id: '1',
        title: 'title1',
        trending_datetime: '',
        images: {
          original: {
            width: '200',
            height: '200',
            url: 'www.sampleurl.com/3.gif'
          },
          fixed_width: {
            width: '100',
            height: '100',
            url: 'www.sampleurl.com/1.gif'
          }
        } 
      },
      {
        id: '2',
        title: 'title2',
        trending_datetime: '',
        images: {
          fixed_width: {
            width: '200',
            height: '200',
            url: 'www.sampleurl.com/2.gif'
          },
          original: {
            width: '200',
            height: '200',
            url: 'www.sampleurl.com/2.gif'
          }
        } 
      },
      {
        id: '3',
        title: 'title3',
        trending_datetime: '',
        images: {
          original: {
            width: '200',
            height: '200',
            url: 'www.sampleurl.com/3.gif'
          },
          fixed_width: {
            width: '200',
            height: '200',
            url: 'www.sampleurl.com/3.gif'
          }
        } 
      },
      {
        id: '4',
        title: 'title4',
        trending_datetime: '',
        images: {
          original: {
            width: '200',
            height: '200',
            url: 'www.sampleurl.com/3.gif'
          },
          fixed_width: {
            width: '100',
            height: '100',
            url: 'www.sampleurl.com/4.gif'
          }
        } 
      }
    ]

    const { maxHeight, children } = createChildren(gifs, 2, 10, 1010)

    expect(maxHeight).toBe(1020)
    expect(children).toEqual([
      <Gif
        key="1"
        id="1"
        title="title1"
        url="www.sampleurl.com/1.gif"
        x={0}
        y={0}
        width={500}
        height={500}
      />,
      <Gif
        key="2"
        id="2"
        title="title2"
        url="www.sampleurl.com/2.gif"
        x={510}
        y={0}
        width={500}
        height={500}
      />,
      <Gif
        key="3"
        id="3"
        title="title3"
        url="www.sampleurl.com/3.gif"
        x={0}
        y={510}
        width={500}
        height={500}
      />,
      <Gif
        key="4"
        id="4"
        title="title4"
        url="www.sampleurl.com/4.gif"
        x={510}
        y={510}
        width={500}
        height={500}
      />
    ])
  })
})
