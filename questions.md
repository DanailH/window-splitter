## Follow-up questions

### If you didn't have time to complete all the above task's items, how would you have approached them?

I was able to compleate the task but unfortunately I didn't use Typescript not because I don't know it or can't use it but rather because I would have wasted quite some time trying to get the types to work, that is because i haven't used Typescript with combination with React before. Also altho I didn't use any additional libraries I did add Enzyme for the unit test.

### If you had more time to research the component, which source would you have used and for which aspect of the design of the component?

I think that the important part is the API that is being exposed from that component because once you decide on an API then everytime you change it you are introducing breaking changes. So in terms of research I would check what is the API that other frameworks expose for their Window Splitter component. Also One thing that needs additional checking is a11y. The current implementation that i have depends on the user of the component to provide that but maybe it is better for the basic accessibility to be handled by the component.

### How could we implement touch screens support? Any specific aspect to pay attention to?

I think for mobile the biggest problem will be when the user rotates the screen because then the component needs to recalculate the possitions and trigger browser repaint which may result in jumping of the screen or unneded movement of the content. Regarding the aspect ration - it shouldn't be a problem for the component because the current implementation depends on the user to set the size of the component via css classes or wrapper HTML element.

### How could we make the component style engine independent (so developers can choose between SCSS, styled-components and else)?

Hmm that is interesting - to be honest I don't know. One thing is for sure and that is there should not be any inline styles because otherwise they wont be able to be overwriten. I guess having a separete file for the styles plus a build procedure would be needed so that the default css file can be replced with the desired css precompiler.
