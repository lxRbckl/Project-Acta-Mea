# Project Acta Mea by Alex Arbuckle #


# import <
from os import path
from github import Github
from discord import Intents
from discord.ext import commands
from lxRbckl import githubGet, githubSet, jsonLoad

# >


# global <
gFile = ''
gRepository = ''
gPath = path.realpath(__file__).split('/')
gDirectory = '/'.join(gPath[:(len(gPath) - 1)])
githubToken = ''
actaMea = commands.Bot(command_prefix = '', intents = Intents.all())
discordToken = ''

# >


async def setFunction(ctx, pServer: str, pService: str, pData: dict):
    '''  '''

    # if (server) <
    # elif (service) <
    if ((pServer not in pData.keys()) and (not pService)):

        # add new element <
        # set data and delete message <
        pData[pServer] = []
        await ctx.message.delete()
        githubSet(

            pFile = gFile,
            pData = pData,
            pRepository = gRepository,
            pGithub = Github(githubToken)

        )

        # >

    elif ((pServer in pData.keys()) and (pService)):

        # add service to server <
        # set data and delete message <
        pData[pServer].append(pService)
        await ctx.message.delete()
        githubSet(

            pFile = gFile,
            pData = pData,
            pRepository = gRepository,
            pGithub = Github(githubToken)

        )

        # >

    # >


async def getFunction(ctx, pServer: str, pService: str, pData: dict):
    '''  '''

    # if server <
    # elif default <
    if (pServer in pData.keys()):

        await ctx.channel.send('\n'.join(f'`{i}`' for i in pData[pServer]), delete_after = 60)
        await ctx.message.delete()

    elif (not pServer):

        await ctx.channel.send('\n'.join(f'`{i}`' for i in sorted(pData.keys())), delete_after = 60)
        await ctx.message.delete()

    # >


async def updateFunction(ctx, pServerTo: str, pServerFrom: str, pData: dict):
    '''  '''

    # if ((new server destination) and (existing server origination)) <
    if ((pServerTo not in pData.keys()) and (pServerFrom in pData.keys())):

        # add new server  <
        # delete old server <
        pData[pServerTo] = pData[pServerFrom]
        await ctx.message.delete()
        del pData[pServerFrom]
        githubSet(

            pFile = gFile,
            pData = pData,
            pRepository = gRepository,
            pGithub = Github(githubToken)

        )

        # >

    # >


async def deleteFunction(ctx, pServer: str, pService: str, pData: dict):
    '''  '''

    # if server then delete server <
    # elif service then delete service <
    if ((pServer in pData.keys()) and (not pService)):

        del pData[pServer]
        await ctx.message.delete()
        githubSet(

            pFile = gFile,
            pData = pData,
            pRepository = gRepository,
            pGithub = Github(githubToken)

        )

    elif ((pServer in pData.keys()) and (pService)):

        pData[pServer].remove(pService)
        await ctx.message.delete()
        githubSet(

            pFile = gFile,
            pData = pData,
            pRepository = gRepository,
            pGithub = Github(githubToken)

        )

    # >


async def whereFunction(ctx, pService: str, pServer: str, pData: dict):
    '''  '''

    # get list of all matching <
    r = [k for k, v in pData.items() if (pService in v)]

    # >

    await ctx.message.delete()
    await ctx.channel.send('\n'.join(f'`{i}`' for i in sorted(r)), delete_after = 60)


@commands.has_permissions(administrator = True)
@actaMea.command(aliases = jsonLoad(pFile = f'{gDirectory}/setting.json')['aliases'])
async def commandFunction(ctx, pServer: str = None, pService: str = None):
    '''  '''

    await {

        'set' : setFunction,
        'get' : getFunction,
        'del' : deleteFunction,
        'where' : whereFunction,
        'update' : updateFunction,
        'delete' : deleteFunction

    }[ctx.invoked_with.lower()](

        ctx,
        pServer,
        pService,
        githubGet(

            pFile = gFile,
            pRepository = gRepository,
            pGithub = Github(githubToken),

        )

    )


# main <
if (__name__ == '__main__'): actaMea.run(discordToken)

# >
