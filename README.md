---
layout: post
title: README
weight: 6
permalink: /README/
highlight: true
---

## Introduction

The MREST documentation is published using [Jekyll](http://jekyllrb.com), which uses [Markdown](http://daringfireball.net/projects/markdown) to generate static websites.

The source files for the MREST documentation is available at [https://bitbucket.org/deginner/mrest-doc](https://bitbucket.org/deginner/mrest-doc)

## Building Jekyll

To install jekyll on Ubuntu, follow this guide.

1. Install rvm [1].

   * `$> gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3`
   * `$> \curl -sSL https://get.rvm.io | bash -s stable`

2. Install ruby > 2.0.0 [2]

   * `$> source ~/.rvm/scripts/rvm`
   * `$> rvm requirements`
   * `$> rvm install 2.0.0`

3. Install jekyll

   * `$> gem install jekyll`

4. To get back into your ruby env, It's likely you will have to re-run the first command of step 2.

   * `$> source ~/.rvm/scripts/rvm`

## Build and run the site locally

1. Clone the MREST-doc repository to your local machine.

   * `$> git clone https://@bitbucket.org/deginner/mrest-doc.git`

2. Enter the mrest-doc directory

   * `$> cd mrest-doc`

3. Use jekyll to build and run the MREST-doc site.

   * `$> jekyll build`
   * `$> jekyll serve` [3]

**Result:**  A development server will run at [http://localhost:4000/](http://localhost:4000/)



## Footnotes

[1]  source: [http://rvm.io/](http://rvm.io/)

[2]  source: [http://cheat.errtheblog.com/s/rvm](http://cheat.errtheblog.com/s/rvm)

[3]  As of Jekyll version 2.4, the serve command will watch for changes and regenerate the site automatically. To disable this, you can use `jekyll serve --no-watch`. 