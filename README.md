## Introduction

The MREST documentation is published using [Jekyll](http://jekyllrb.com), which uses [Markdown](http://daringfireball.net/projects/markdown) to generate static websites.

The source files for the MREST documentation are available at [https://bitbucket.org/deginner/mrest-doc](https://bitbucket.org/deginner/mrest-doc)

## Options for Contributing
* If your plan is to add a new page to the documentation, it is recommended that you set up the site in your [local environment][].
* If you simply wish to make a minor adjustment to an existing page, you can do so via your browser.
* With either approach, you will submit a [pull request](https://bitbucket.org/deginner/mrest-doc/pull-requests/) to the project to get your changes included.
* Please report any issues discovered in the documentation at (https://bitbucket.org/deginner/mrest-doc/issues)

[local environment]: #local-development

## Formatting

### Front Matter 
* For a file to be built by Jekyll, it must contain [YAML](http://yaml.org) [front matter](http://jekyllrb.com/docs/frontmatter/)

### Code Snippets
    Differing from traditional Markdown, Jekyll relies on either [Pygments](http://pygments.org) or [Rouge](https://github.com/jneen/rouge) for syntax highlighting [4]. While Pygments supports syntax highlighting for [over 100 languages](http://pygments.org/languages/), you must have Python installed on your system and set highlighter to pygments in your site's configuration file.

    Rouge does not support as many languages as Pygments; however, it is a Ruby package, so you need not install Python on your system.

## Local Development

### Building Jekyll

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

### Build and run the site locally

1. Clone the MREST-doc repository to your local machine.

   * `$> git clone https://@bitbucket.org/deginner/mrest-doc.git`

2. Enter the mrest-doc directory

   * `$> cd mrest-doc`

3. Use jekyll to build and run the MREST-doc site.

   * `$> jekyll build`
   * `$> jekyll serve` [3]

**Result:**  A development server will run at [http://localhost:4000/](http://localhost:4000/)



## Notes

[1]  source: [http://rvm.io/](http://rvm.io/)

[2]  source: [http://cheat.errtheblog.com/s/rvm](http://cheat.errtheblog.com/s/rvm)

[3]  As of Jekyll version 2.4, the serve command will watch for changes and regenerate the site automatically. To disable this, you can use `jekyll serve --no-watch`. 

[4] source: [http://jekyllrb.com/docs/templates/](http://jekyllrb.com/docs/templates/)