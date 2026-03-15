https://feature-sliced.design/docs/guides/tech/with-nextjs

You will also need to add a pages folder to the project root, otherwise Next.js will try to use src/pages as the Pages Router even if you use the App Router, which will break the build. It's also a good idea to put a README.md file inside this root pages folder describing why it is necessary, even though it's empty.
