set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'scrooloose/nerdtree'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'edkolev/tmuxline.vim'
Plugin 'jelera/vim-javascript-syntax'

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line

syntax enable

colorscheme solarized
set background=dark
set t_Co=256
set shiftwidth=2
set softtabstop=2
set backspace=2
set expandtab
set number
set relativenumber
set autoindent
set laststatus=2

" Toggle NERDTree with ctrl-n
map <C-n> :NERDTreeToggle<CR>

" Open NERDTree when starting up vim in a file
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif

" Close NERDTree if it is the last buffer open
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

" Highlight searching
:set hlsearch
nmap // :noh<Enter>

" Highlight trailing whitespace
highlight ExtraWhitespace ctermbg=red guibg=red
match ExtraWhitespace /\s\+$/

" Delete trailing whitespace on save
autocmd BufWritePre * :%s/\s\+$//e

" Configure airline
let g:airline_theme='powerlineish'
let g:airline_powerline_fonts = 1
let g:airline_detect_modified = 1
let g:tmuxline_powerline_seperators = 0

" Set syntax highlighting for uncommon extensions
au BufReadPost *.hbs set syntax=html
au BufReadPost *.ejs set syntax=javascript
au BufReadPost *.rabl set syntax=ruby

" Bind :W to write because I always accidentally type that when I mean :w
command W w
