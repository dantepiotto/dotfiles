---@type MappingsTable
local M = {}

M.general = {
    n = {
        [";"] = { ":", "enter command mode", opts = { nowait = true } },
    },
    v = {
        [">"] = { ">gv", "indent"},
    },
}

-- more keybinds!

M.vimtex = {
    n = {
    ["<leader>Cc"] = { ":VimtexCompile<CR>", "start vimtex compilation" },
    ["<leader>Ct"] = { ":VimtexTocToggle<CR>", "toggle vimtex ToC" },
    },
}

return M
