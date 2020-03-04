import React from 'react';
import { mount } from 'enzyme';
import WindowSplitter from './windowSplitter';

it('renders without crashing', () => {
  mount(
    <WindowSplitter>
      <WindowSplitter.Left/>
      <WindowSplitter.Right/>
    </WindowSplitter>
  );
});

it('', () => {
  const initialEvent = {
    clientX: 0
  };
  const event = {
    clientX: 10
  };

  const component = mount(
    <WindowSplitter>
      <WindowSplitter.Left>
      </WindowSplitter.Left>
      <WindowSplitter.Right>
      </WindowSplitter.Right>
    </WindowSplitter>
  );;

  const windowSeparator = component.find('.separator').first();
  const windowSplitterLeftEl = component.find('.window-splitter-left').first();
  const windowSplitterLeftElInitialWidth = windowSplitterLeftEl.getDOMNode().clientWidth;

  windowSeparator.simulate('mousedown', initialEvent);
  windowSeparator.simulate('mousemove', event);
  windowSeparator.simulate('mouseup');

  // Currently the test fails because the event doesnt update the width of my element but i wanted to test
  // that the width of my left window is changing when the mouseMove event occurs
  expect(windowSplitterLeftEl.getDOMNode().clientWidth).toEqual(windowSplitterLeftElInitialWidth + event.clientX);
});
