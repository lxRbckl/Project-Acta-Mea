# Acta Mea by Alex Arbuckle #


# Import <
from os import path
from discord import utils
from json import load, dump
from discord import Intents
from discord.ext.commands import Bot

# >


# Declaration <
admin = ''
path = path.realpath(__file__)[:-10]
actaMea = Bot(command_prefix = '', intents = Intents.all())
token = ''

# >


async def jsonLoad():
    '''  '''

    with open(f'{path}actaMea.json', 'r') as fileVariable:

        return load(fileVariable)


async def jsonDump(arg):
    ''' arg : dict '''

    with open(f'{path}actaMea.json', 'w') as fileVariable:

        dump(arg, fileVariable, indent = 4)


@actaMea.event
async def on_member_join(member):
    ''' member : class '''

    await member.add_roles(utils.get(member.guild.roles, name = 'Admin')) if (str(member) == admin) else (None)


@actaMea.command(aliases = ['get', 'Get'])
async def getServer(ctx, arg):
    ''' arg : str '''

    arg = arg.replace(' ', '-')
    dictVariable = await jsonLoad()

    # if Valid and Admin <
    if (arg in dictVariable.keys() and (admin == str(ctx.author))):

        await ctx.message.delete()
        await ctx.author.send(await actaMea.get_channel(dictVariable[arg]).create_invite(), delete_after = 15)

    # >

    else:

        await ctx.author.send('There was an error.', delete_after = 30)


@actaMea.command(aliases = ['set', 'Set'])
async def setServer(ctx, *args):
    ''' args[n] : str '''

    arg = '-'.join(i for i in args)
    dictVariable = await jsonLoad()

    # if Exists or Not Admin <
    if ((arg in dictVariable.keys()) or (admin != str(ctx.author))):

        await ctx.author.send('There was an error.', delete_after = 30)

    # >

    else:

        dictVariable[arg] = int(ctx.channel.id)

        await ctx.message.delete()
        await jsonDump(dictVariable)
        await ctx.author.send(f'{arg} was added.', delete_after = 30)


@actaMea.command(aliases = ['show', 'Show'])
async def showServer(ctx):
    '''  '''

    dictVariable = await jsonLoad()
    strVariable = '\n'.join(f'{i}' for i in dictVariable.keys())

    await ctx.message.delete()
    await ctx.author.send(strVariable, delete_after = 30) if (admin in str(ctx.author)) else (None)


@actaMea.command(aliases = ['remove', 'Remove'])
async def removeServer(ctx, arg):
    ''' arg : str '''

    dictVariable = await jsonLoad()

    if ((arg in dictVariable.keys()) and (admin == str(ctx.author))):

        del dictVariable[arg]

        await ctx.message.delete()
        await jsonDump(dictVariable)
        await ctx.author.send(f'{arg} was removed.', delete_after = 30)

    else:

        await ctx.author.send(f'{arg} does not exist.', delete_after = 30)


# Main <
if (__name__ == '__main__'):

    actaMea.run(token)

# >
