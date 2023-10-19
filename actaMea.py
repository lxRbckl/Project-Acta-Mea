# Project Acta Mea by Alex Arbuckle #


# import <
from os import path
from json import load, dump
from discord import Intents
from discord.ext import commands

# >


# global <
path = path.realpath(__file__).split('/')
directory = '/'.join(path[:(len(path) - 1)])
actaMea = commands.Bot(command_prefix = '', intents = Intents.all())
token = ''

# >


def jsonLoad(file: str):
    '''  '''

    # get file <
    # get data <
    with open(f'{directory}{file}', 'r') as fin:

        return load(fin)

    # >


def jsonDump(file: str, data: dict):
    '''  '''

    # set file <
    # set data <
    with open(f'{directory}{file}', 'w') as fout:

        dump(data, fout, indent = 3)

    # >


@commands.has_permissions(administrator = True)
@actaMea.command(aliases = jsonLoad(file = '/setting.json')['alias']['set'])
async def setCommand(ctx, parKey: str, *args) -> None:
    '''  '''

    # get data <
    data = jsonLoad(file = '/data.json')

    # >

    # if ((existing key) and (nonexisting value)) then set <
    if ((parKey in data.keys()) and (args[0] not in data[parKey].keys())):

        # set node <
        # update data <
        # delete message <
        data[parKey][args[0]] = ' '.join(args[1:])
        jsonDump(file = '/data.json', data = data)
        await ctx.message.delete()

        # >

    # >

    # else then nonexisting key or existing value <
    else: await ctx.send('Node already exists.', delete_after = 180)

    # >


@commands.has_permissions(administrator = True)
@actaMea.command(aliases = jsonLoad(file = '/setting.json')['alias']['get'])
async def getCommand(ctx, parKey: str, parValue: str) -> None:
    '''  '''

    # get data <
    data = jsonLoad(file = '/data.json')

    # >

    # if ((existing key) and (nonexisting value)) then get <
    if ((parKey in data.keys()) and (parValue in data[parKey].keys())):

        # get node <
        # delete message <
        await ctx.send(data[parKey][parValue], delete_after = 180)
        await ctx.message.delete()

        # >

    # >

    # else then nonexisting key or nonexisting value <
    else: await ctx.send('Node does not exist.', delete_after = 180)

    # >


@actaMea.command(aliases = jsonLoad(file = '/setting.json')['alias']['del'])
async def delCommand(ctx, parKey: str, parValue: str) -> None:
    '''  '''

    # get data <
    data = jsonLoad(file = '/data.json')

    # >

    # if ((existing key) and (nonexisting value)) then get <
    if ((parKey in data.keys()) and (parValue in data[parKey].keys())):

        # delete node <
        # update data <
        # delete message <
        del data[parKey][parValue]
        jsonDump(file = '/data.json', data = data)
        await ctx.message.delete()

        # >

    # >

    # else then nonexisting key or nonexisting value <
    else: await ctx.send('Node does not exist.', delete_after = 180)

    # >


@actaMea.command(aliases = jsonLoad(file = '/setting.json')['alias']['show'])
async def showCommand(ctx, parKey: str) -> None:
    '''  '''

    # get data <
    data = jsonLoad(file = '/data.json')

    # >

    # if (existing key) then send <
    if (parKey in data.keys()):

        # send to user <
        # delete message <
        await ctx.send('\n'.join(k for k in data[parKey].keys()), delete_after = 60)
        await ctx.message.delete()

        # >

    # >

    # else then notify <
    else: await ctx.send('Data does not exist.', delete_after = 180)

    # >


# main <
if (__name__ == '__main__'):

    actaMea.run(token)

# >


# I Love You #
